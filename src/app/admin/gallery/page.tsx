'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Image as ImageIcon, 
  Loader2, 
  Star, 
  X, 
  Check, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Upload,
  Tag
} from 'lucide-react'
import { AdminPageLoader } from '@/components/admin/LoadingSpinner'

type GalleryItem = {
  id: string
  title: string
  category: string
  description: string | null
  image_url: string
  is_featured: boolean
  created_at: string
}

type FormData = {
  title: string
  category: string
  description: string
  is_featured: boolean
}

const emptyForm: FormData = {
  title: '',
  category: 'REPAIR',
  description: '',
  is_featured: false,
}

const CATEGORY_OPTIONS = [
  { value: 'REPAIR', label: 'Property Repair' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'FACILITY', label: 'Facility Services' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'BEFORE_AFTER', label: 'Before & After' },
  { value: 'OTHERS', label: 'Others' },
]

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const [form, setForm] = useState<FormData>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const supabase = createClient()

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) {
        setItems(data)
      }
    } catch (err) {
      console.error('Error fetching gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchGallery() 
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
    setIsOpen(true)
  }

  const openEdit = (item: GalleryItem) => {
    setForm({
      title: item.title,
      category: item.category || 'REPAIR',
      description: item.description || '',
      is_featured: !!item.is_featured,
    })
    setEditingId(item.id)
    setImagePreview(item.image_url)
    setImageFile(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imagePreview && !imageFile) {
      alert('Please upload an image for the gallery.')
      return
    }

    setSubmitting(true)

    try {
      let image_url = imagePreview || ''

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `gallery/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
        
        const { data: up, error: upError } = await supabase.storage
          .from('mightybee-assets')
          .upload(fileName, imageFile, { upsert: true })

        if (upError) {
          console.error('Upload error:', upError)
          alert(`Image upload error: ${upError.message}`)
          setSubmitting(false)
          return
        }

        if (up) {
          const { data: pub } = supabase.storage
            .from('mightybee-assets')
            .getPublicUrl(fileName)
          image_url = pub.publicUrl
        }
      }

      const payload = {
        title: form.title,
        category: form.category,
        description: form.description || null,
        image_url,
        is_featured: form.is_featured,
      }

      if (editingId) {
        const { error } = await supabase.from('gallery').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('gallery').insert(payload)
        if (error) throw error
      }

      setIsOpen(false)
      setEditingId(null)
      fetchGallery()
    } catch (err: any) {
      console.error('Error saving gallery item:', err)
      alert(`Failed to save gallery photo: ${err.message || 'Unknown error'}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    try {
      const { error } = await supabase.from('gallery').delete().eq('id', item.id)
      if (error) throw error
      fetchGallery()
    } catch (err: any) {
      console.error('Error deleting photo:', err)
      alert(`Error deleting photo: ${err.message || 'Unknown error'}`)
    }
  }

  const toggleFeatured = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ is_featured: !item.is_featured })
        .eq('id', item.id)
      if (error) throw error
      fetchGallery()
    } catch (err) {
      console.error('Error toggling featured status:', err)
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory
      const matchSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [items, search, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => { 
    setPage(1) 
  }, [search, selectedCategory])

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #333',
    borderRadius: '6px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    outline: 'none',
    background: '#111',
    color: '#fff',
  }
  
  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.06em',
    color: '#888',
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Work Gallery
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', margin: 0 }}>
            Upload, categorize, and manage project photos saved to Supabase
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search gallery..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none' }}
            />
          </div>

          {/* Add Photo Button */}
          <button
            onClick={openCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
          >
            <Plus size={18} /> ADD PHOTO
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setSelectedCategory('ALL')}
          style={{
            padding: '7px 16px',
            borderRadius: '20px',
            border: selectedCategory === 'ALL' ? '1px solid #E8A020' : '1px solid #333',
            background: selectedCategory === 'ALL' ? '#E8A020' : '#1a1a1a',
            color: selectedCategory === 'ALL' ? '#111' : '#AAA',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          ALL ({items.length})
        </button>
        {CATEGORY_OPTIONS.map(cat => {
          const count = items.filter(i => i.category === cat.value).length
          const active = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: active ? '1px solid #E8A020' : '1px solid #333',
                background: active ? '#E8A020' : '#1a1a1a',
                color: active ? '#111' : '#AAA',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label.toUpperCase()} ({count})
            </button>
          )
        })}
      </div>

      {/* Photo Cards Grid */}
      {loading ? (
        <AdminPageLoader label="Loading gallery photos..." />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div style={{ background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', color: '#888' }}>
              <ImageIcon size={48} color="#E8A020" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', color: '#fff', margin: '0 0 6px' }}>
                No Photos Found
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', margin: '0 0 1.5rem' }}>
                {search || selectedCategory !== 'ALL' ? 'No items match your active filters.' : 'Your gallery is currently empty. Click below to add your first photo.'}
              </p>
              <button
                onClick={openCreate}
                style={{ padding: '8px 18px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px' }}
              >
                + UPLOAD FIRST PHOTO
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {paginatedItems.map(item => (
                <div key={item.id} style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
                  {/* Photo Container */}
                  <div style={{ position: 'relative', width: '100%', height: '220px', background: '#111' }}>
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    
                    {/* Featured Badge */}
                    {item.is_featured && (
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#E8A020', color: '#111', padding: '4px 10px', borderRadius: '20px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={10} fill="#111" /> FEATURED
                      </div>
                    )}

                    {/* Action Buttons Top Right */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => openEdit(item)} 
                        title="Edit Photo"
                        style={{ width: '32px', height: '32px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                      >
                        <Edit2 size={14} color="#fff" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item)} 
                        title="Delete Photo"
                        style={{ width: '32px', height: '32px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                      >
                        <Trash2 size={14} color="#FF5555" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                      <span style={{ background: 'rgba(232, 160, 32, 0.12)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#E8A020', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}>
                        {item.category}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '19px', margin: '0 0 6px', color: '#fff', lineHeight: 1.2 }}>
                      {item.title}
                    </h3>

                    {item.description && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', margin: '0 0 1rem', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.description}
                      </p>
                    )}

                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={() => toggleFeatured(item)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: item.is_featured ? 'rgba(232, 160, 32, 0.1)' : 'transparent', color: item.is_featured ? '#E8A020' : '#777', border: `1px solid ${item.is_featured ? 'rgba(232, 160, 32, 0.3)' : '#333'}`, borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600 }}
                      >
                        <Star size={12} fill={item.is_featured ? '#E8A020' : 'none'} color={item.is_featured ? '#E8A020' : '#777'} />
                        {item.is_featured ? 'Featured' : 'Feature'}
                      </button>

                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#555' }}>
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '1rem' }}>
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: page === 1 ? '#555' : '#fff', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={18} /> PREV
              </button>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                Page {page} of {totalPages}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: page === totalPages ? '#555' : '#fff', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                NEXT <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Upload / Edit Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '26px', color: '#fff', textTransform: 'uppercase', margin: '0 0 1.5rem' }}>
              {editingId ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Image Upload Box */}
              <div>
                <label style={labelStyle}>PHOTO FILE *</label>
                <div 
                  style={{
                    border: '2px dashed #333',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: '#141414',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {imagePreview ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ maxHeight: '180px', borderRadius: '6px', objectFit: 'contain' }} 
                      />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                        style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#FF4444', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} color="#E8A020" style={{ margin: '0 auto 8px', opacity: 0.8 }} />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#AAA', margin: '0 0 4px' }}>
                        Click to select or drag and drop photo
                      </p>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#666' }}>
                        PNG, JPG, WEBP up to 10MB (Stored in Supabase)
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={labelStyle}>PHOTO / PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Roof Waterproofing"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>CATEGORY *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={inputStyle}
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} style={{ background: '#111', color: '#fff' }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>CAPTION / DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Brief details about the work done, location, or equipment used..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {/* Featured Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={form.is_featured}
                  onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#E8A020', cursor: 'pointer' }}
                />
                <label htmlFor="featured-check" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#fff', cursor: 'pointer' }}>
                  Highlight as Featured (shown prominently on public pages)
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{ padding: '10px 18px', background: 'transparent', border: '1px solid #444', borderRadius: '6px', color: '#AAA', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: '#E8A020', border: 'none', borderRadius: '6px', color: '#111', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> SAVING TO SUPABASE...
                    </>
                  ) : (
                    <>
                      <Check size={16} /> {editingId ? 'UPDATE PHOTO' : 'SAVE PHOTO'}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}

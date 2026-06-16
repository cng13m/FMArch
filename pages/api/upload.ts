import { supabase } from '@/lib/supabase'
import formidable from 'formidable'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parse failed' })
    const file = files.file
    if (!file) return res.status(400).json({ error: 'No file uploaded' })

    try {
      const fileData = fs.readFileSync(file.filepath)
      const fileName = `${Date.now()}-${file.originalFilename}`

      const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET!)
        .upload(fileName, fileData, {
          cacheControl: parseInt(process.env.SUPABASE_CACHE_CONTROL!) || 3600,
          upsert: false,
        })

      if (error) return res.status(500).json({ error: error.message })

      const { data: urlData } = supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET!)
        .getPublicUrl(fileName)

      if (!urlData?.publicUrl) return res.status(500).json({ error: 'Could not get public URL' })

      res.status(200).json({ url: urlData.publicUrl })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  })
}

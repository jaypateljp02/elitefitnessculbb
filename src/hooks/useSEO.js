import { useEffect } from 'react'

const BASE_URL = 'https://theelitefitnessclubb.com'

export default function useSEO({ title, description, path = '', ogImage = '/asset/Logo.webp' }) {
    useEffect(() => {
        // Title
        document.title = title ? `${title} | The Elite Fitness Clubb` : 'The Elite Fitness Clubb | Best Premium Gym in Hinjewadi, Pune'

        // Meta Description
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc && description) metaDesc.setAttribute('content', description)

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', `${BASE_URL}${path}`)

        // Open Graph
        const ogTags = {
            'og:title': title || 'The Elite Fitness Clubb',
            'og:description': description || '',
            'og:url': `${BASE_URL}${path}`,
            'og:image': ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
            'og:type': 'website',
            'og:site_name': 'The Elite Fitness Clubb',
        }

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`)
            if (!tag) {
                tag = document.createElement('meta')
                tag.setAttribute('property', property)
                document.head.appendChild(tag)
            }
            tag.setAttribute('content', content)
        })

        // Twitter Card
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': title || 'The Elite Fitness Clubb',
            'twitter:description': description || '',
            'twitter:image': ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
        }

        Object.entries(twitterTags).forEach(([name, content]) => {
            let tag = document.querySelector(`meta[name="${name}"]`)
            if (!tag) {
                tag = document.createElement('meta')
                tag.setAttribute('name', name)
                document.head.appendChild(tag)
            }
            tag.setAttribute('content', content)
        })

    }, [title, description, path, ogImage])
}

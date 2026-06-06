interface FetchIpv4Options {
  method?: string
  headers?: Record<string, string>
  body?: string
}

// fetch nativo de Node falla en redes sin IPv6 (intenta IPv6 primero).
// Este helper usa el módulo https forzando family: 4 (IPv4) y sigue redirects.
export async function fetchIpv4(
  url: string,
  options: FetchIpv4Options = {},
  depth = 0
): Promise<{ status: number; text: string }> {
  // Import dinámico: evita que webpack lo incluya en el bundle del cliente.
  const https = await import('https')

  return new Promise((resolve, reject) => {
    if (depth > 5) return reject(new Error('Demasiados redirects'))

    const req = https.request(
      url,
      {
        method: options.method ?? 'GET',
        headers: options.headers,
        family: 4,
      },
      (res) => {
        const status = res.statusCode ?? 0

        // Seguir redirects (Apps Script responde 302 → googleusercontent.com).
        // Tras un redirect se usa GET sin body (comportamiento estándar 302/303).
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume()
          resolve(fetchIpv4(res.headers.location, { method: 'GET' }, depth + 1))
          return
        }

        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve({ status, text: data }))
      }
    )

    req.on('error', reject)
    if (options.body) req.write(options.body)
    req.end()
  })
}

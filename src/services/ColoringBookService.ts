// src/services/ColoringBookService.ts
const BASE_URL = 'http://localhost:3333/coloring-books'

export default {
  async list() {
    try {
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) throw new Error('Error al listar libros')
      return await res.json()
    } catch (err: any) {
      console.error('Error al listar libros:', err)
      throw new Error(err.message || 'Error al listar libros')
    }
  },

  async create(data: any) {
  try {
    const payload = {
      ...data,
      cantidadPaginas: Number(data.cantidadPaginas),
      precio: Number(data.precio),
      popularidad: Number(data.popularidad),
      activo: Number(data.activo),
      destacado: Number(data.destacado),
    }

    if (!payload.pageRangeId) {
      delete payload.pageRangeId
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    })

    const responseBody = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.error('Respuesta con error del backend:', responseBody)
      throw new Error(responseBody?.errors?.[0]?.message || responseBody.message || 'Error al crear libro')
    }

    return responseBody
  } catch (err: any) {
    console.error('Error al crear libro (catch):', err)
    throw new Error(err.message || 'Error al crear libro')
  }
},


async updatePatch(id: number, data: any) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Error al actualizar libro')
      return await res.json()
    } catch (err: any) {
      console.error('Error al actualizar libro:', err)
      throw new Error(err.message || 'Error al actualizar libro')
    }
  },

  async delete(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) throw new Error('Error al eliminar libro')
      return true
    } catch (err: any) {
      console.error('Error al eliminar libro:', err)
      throw new Error(err.message || 'Error al eliminar libro')
    }
  },
}

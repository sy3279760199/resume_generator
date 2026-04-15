// 登录 API 调用

const API_BASE_URL = 'http://localhost:3000/api'

// 用户登录/注册
export async function login(username, password, email = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })

    const data = await response.json()
    
    if (data.success) {
      return {
        success: true,
        token: data.token,
        username: data.username,
        message: data.message
      }
    } else {
      return {
        success: false,
        message: data.message
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: '登录失败，请检查网络连接'
    }
  }
}

// 验证 token
export async function verifyToken(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/login/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('Verify error:', error)
    return false
  }
}

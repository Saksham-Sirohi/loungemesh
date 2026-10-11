export function getOrCreateSessionUserKey(): string {
  try {
    let key = sessionStorage.getItem('loungemesh_user_key');
    if (!key) {
      key = `uk_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem('loungemesh_user_key', key);
    }
    return key;
  } catch {
    return `uk_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

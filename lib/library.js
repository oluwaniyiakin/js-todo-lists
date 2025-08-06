// i use A simple toast notification library
export function showToast(message, duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  // Create toast message
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.background = '#1976d2';
  toast.style.color = '#fff';
  toast.style.padding = '12px 20px';
  toast.style.marginTop = '10px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  toast.style.fontSize = '14px';
  toast.style.opacity = '0.95';
  toast.style.transition = 'opacity 0.3s ease';

  toastContainer.appendChild(toast);

  // Remove toast after `duration`
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

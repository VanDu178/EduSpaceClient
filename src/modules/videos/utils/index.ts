/**
 * Format thời lượng video từ số giây sang string MM:SS hoặc HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}


/**
 * Trích xuất YouTube Embed URL an toàn từ ID hoặc URL gốc
 */
export function getYoutubeEmbedUrl(youtubeVideoId?: string | null, rawUrl?: string | null): string | null {
  if (youtubeVideoId && /^[\w-]{11}$/.test(youtubeVideoId.trim())) {
    return `https://www.youtube.com/embed/${youtubeVideoId.trim()}?autoplay=1&enablejsapi=1`;
  }
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (/^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?autoplay=1&enablejsapi=1`;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&enablejsapi=1`;
  }
  return null;
}
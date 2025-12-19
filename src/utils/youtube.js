// Helper function to extract YouTube video ID from various URL formats
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

// Helper function to get video thumbnail URL
export const getVideoThumbnail = (video) => {
  // If thumbnail is provided and not empty, use it
  if (video.thumbnail && video.thumbnail.trim() !== "") {
    return video.thumbnail;
  }

  // Try to extract YouTube video ID and generate thumbnail
  const videoId = getYouTubeVideoId(video.videoUrl);
  if (videoId) {
    // Try maxresdefault first (best quality), fallback to hqdefault
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // Fallback to a default cricket thumbnail
  return "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=640&h=360&fit=crop";
};


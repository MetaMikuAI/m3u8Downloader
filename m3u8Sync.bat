ffmpeg -i %2 -vn -acodec copy m3u8Sync.aac
ffmpeg -i %1 -i m3u8Sync.aac -vcodec copy -acodec copy m3u8Sync.mp4
del m3u8Sync.aac
ffmpeg -i m3u8Sync.mp4 -c:v libx264 -c:a aac output.mp4
del m3u8Sync.mp4

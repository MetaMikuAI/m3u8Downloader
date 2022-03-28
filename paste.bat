ffmpeg -i %2 -vn -acodec copy temp.aac
ffmpeg -i %1 -i temp.aac -vcodec copy -acodec copy output.mp4
del temp.aac
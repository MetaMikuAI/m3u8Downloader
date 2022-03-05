import ffmpy
screen=input('视频>>>')
sound=input('音频>>>')
ff = ffmpy.FFmpeg(
     inputs={screen:'-y',sound:None},
     outputs={'output.mp4': ['-vcodec','copy',
'-acodec','copy']})
ff.run()
print(ff.cmd)
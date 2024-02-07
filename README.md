# DownloadVideo(Windows)

### 写在前面(的废话)

这个脚本是我多年前在CSDN看别人转载的，上面的autho叫"酷盖"，我在此基础上加了一些改进。整个方法，怎么说呢，不是很方便，但是长期可用，比如当你下载niconico视频而其他网站都解决不了的时候，这个方法可以做个兜底，偶尔使用挺好的，不适合大量使用。我这几年使用过的网站有N站、b站、b站直播、小鹅通这些，这些网站是可用的，y站、推特尝试过用不了。像b站视频那种，有固定方法的其实也不适用这个项目，反倒是b站直播、n站这些，下载方法少或者不稳定的，用这个项目挺合适的。

### 前置准备

- **ffmpeg**：网上挺多下载&配置方法的，这里不赘述了，最后可以在powershell或者cmd测试一下`ffmpeg`看看能正常试用就行(最好把`ffplay`也安装上，都一套的)
- **浏览器插件-油猴脚本**：Chrome安装油猴需要挂魔法或者找别人的安装包，Edge安装就不用，具体安装方法网上也挺多的。
- **安装脚本**：把本项目`script.js`里面所有内容拷贝到新建的油猴脚本中，保存即可(.js打不开？用记事本/notepad/VScode/...就行）。建议随便打开一个网站，然后在油猴管理处把这个脚本关掉

### 下载流程(以最玄学的n站为例)

1. 找到目标网站，复制网页URL，如：https://www.nicovideo.jp/watch/sm2085047
2. 打开脚本开关，新建标签页粘贴URL进入
3. 播放视频，有需要可以适当加速视频
4. 等待视频播放完毕，或提前结束捕获进行下载。完成后关闭脚本，关闭网页。
5. 下载到两个`.mp4`文件，通常来说一个是纯音轨，一个是纯画面，请确认哪个是音轨，哪个是画面，必要时可以使用`ffplay`来播放检验。   例如我下载到画面`【初音ミク】「月を探して」【オリジナル】 - ニコニコ.mp4`和音轨`【初音ミク】「月を探して」【オリジナル】 - ニコニコ (1).mp4`
6. 准备好脚本`m3u8Sync.bat`，选中上述两个`.mp4`文件，**左键按住视频.mp4拖拽到.bat上**
7. 等待合成完成，浏览观察是否合成正确

### 补充

1. 像b站视频会自动保存上一次的播放进度的，可以尝试加一个GET参数`t=0`，可能有效，因网站而异
2. ffmpeg和.bat不用也可以用视频剪辑软件，一样的
3. b站好像挂了(悲)，不过b站直播好像还挺好用的，n站好像大部分的视频还是可以的，有的视频不行
4. 有的时候合成好的视频打不开，可以先用ffplay播放看一下，有可能是windows自带的媒体播放器太菜了打不开，可以换用播放器或者用Rr之类的剪辑软件导入导出一下就好了(目前还没找到能直接写成ffmpeg指令的方法)

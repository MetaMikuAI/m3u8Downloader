// ==UserScript==
// @name         m3u8Downloader
// @namespace    https://github.com/MetaMikuAI/m3u8Downloader/
// @version      1.0
// @description  Download m3u8 video and change video play rate
// @author       MetaMiku
// @match        *://*.bilibili.com/*
// @match        *://*.nicovideo.jp/*
// @grant        none
// ==/UserScript==

(function () {
    let _sourceBufferList = []
    let $rateInput = document.createElement('input'); // 创建速率输入框
    let $btnChangeRate = document.createElement('div'); // 创建速率更改按钮
    let $btnDownload = document.createElement('div'); // 创建已捕获数信息框
    let $downloadNum = document.createElement('div'); // 创建下载按钮
    let $currentRate = 1.;


    // 定时器，每100ms根据输入设置播放速度
    function maintainPlaybackRate() {
        let $domList = document.getElementsByTagName('video');
        for (let i = 0, length = $domList.length; i < length; i++) {
            const $dom = $domList[i];
            $dom.playbackRate = $currentRate; // 设置视频播放速度
        }
    }

    // 更改视频速度的函数
    function _changeRatePlay () {
        let rate = parseFloat($rateInput.value); // 获取输入框中的值并转换为浮点数
        if (isNaN(rate) || rate <= 0) {
            alert('请输入有效的播放速度！');
            return;
        }
        $currentRate = rate;
    }

    // 下载已捕获资源
    function _download () {
        _sourceBufferList.forEach((target) => {
        const mime = target.mime.split(';')[0]
        const type = mime.split('/')[1]
        const fileBlob = new Blob(target.bufferList, { type: mime }) // 创建一个Blob对象，并设置文件的 MIME 类型
        const a = document.createElement('a')
        a.download = `${document.title}.${type}`
        a.href = URL.createObjectURL(fileBlob)
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        a.remove()
        })
    }

    // 监听资源全部录取成功
    let _endOfStream = window.MediaSource.prototype.endOfStream
    window.MediaSource.prototype.endOfStream = function () {
      alert('资源全部捕获成功，即将下载！')
      _download()
      _endOfStream.call(this)
    }

    // 录取资源
    let _addSourceBuffer = window.MediaSource.prototype.addSourceBuffer
    window.MediaSource.prototype.addSourceBuffer = function (mime) {
        console.log(mime)
        let sourceBuffer = _addSourceBuffer.call(this, mime)
        let _append = sourceBuffer.appendBuffer
        let bufferList = []
        _sourceBufferList.push({
            mime,
            bufferList,
        })
        sourceBuffer.appendBuffer = function (buffer) {
            $downloadNum.innerHTML = `已捕获 ${_sourceBufferList[0].bufferList.length} 个片段`
            bufferList.push(buffer)
            _append.call(this, buffer)
        }
        return sourceBuffer
    }
    // 添加操作的 dom
    function _appendDom () {
        const baseStyle = `
            position: fixed;
            top: 50px;
            right: 50px;
            height: 40px;
            padding: 0 20px;
            z-index: 9999;
            color: white;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            line-height: 40px;
            text-align: center;
            border-radius: 4px;
            background-color: #39c5bb;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
        `
        $rateInput.placeholder = '速度';
        $rateInput.type = 'number'; // 设置输入框为数字类型
        $rateInput.value = '1'; // 默认速度为1
        $rateInput.style = baseStyle + `top: 50px; width: 120px;`;
        document.getElementsByTagName('html')[0].insertBefore($rateInput, document.getElementsByTagName('head')[0]);

        $btnChangeRate.innerHTML = '应用更改';
        $btnChangeRate.style = baseStyle + `top: 100px; width: 120px;`;
        $btnChangeRate.addEventListener('click', _changeRatePlay);
        document.getElementsByTagName('html')[0].insertBefore($btnChangeRate, document.getElementsByTagName('head')[0]);

        $downloadNum.innerHTML = '已捕获 0 个片段'
        $downloadNum.style = baseStyle + `top: 150px; width: 120px;`;
        document.getElementsByTagName('html')[0].insertBefore($downloadNum, document.getElementsByTagName('head')[0]);

        $btnDownload.innerHTML = '下载已捕获片段'
        $btnDownload.style = baseStyle + `top: 200px; width: 120px;`
        $btnDownload.addEventListener('click', _download)
        document.getElementsByTagName('html')[0].insertBefore($btnDownload, document.getElementsByTagName('head')[0]);
    }
    _appendDom();
    setInterval(maintainPlaybackRate, 100); // 100ms循环设定视频播放速度
})()

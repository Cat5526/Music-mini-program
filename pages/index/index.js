// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    item: 0,
    tab: 0,
    playlist: [{
      id: 1, title: '夜的第七章', singer: '周杰伦',
      src: 'http://localhost:3000/夜的第七章.mp3', coverImgUrl: '../images/cover1.jpg'
    }, {
      id: 2, title: '晴天', singer: '周杰伦',
      src: 'http://localhost:3000/晴天.mp3', coverImgUrl: '../images/cover.jpg'
    }, {
      id: 3, title: '七里香', singer: '周杰伦',
      src: 'http://localhost:3000/七里香.mp3', coverImgUrl: '../images/06.jpg'
    }, {
      id: 4, title: 'Mojito', singer: '周杰伦',
      src: 'http://localhost:3000/Mojito.mp3', coverImgUrl: '../images/cover2.jpg'
    }, {
      id: 5, title: '夜曲', singer: '周杰伦',
      src: 'http://localhost:3000/夜曲.mp3', coverImgUrl: '../images/cover1.jpg'
    }, {
      id: 6, title: '以父之名', singer: '周杰伦',
      src: 'http://localhost:3000/以父之名.mp3', coverImgUrl: '../images/cover1.jpg'
    }, {
      id: 7, title: '等你下课', singer: '周杰伦',
      src: 'http://localhost:3000/等你下课.mp3', coverImgUrl: '../images/01.jpg'
    }, {
      id: 8, title: '蒲公英的约定', singer: '周杰伦',
      src: 'http://localhost:3000/蒲公英的约定.mp3', coverImgUrl: '../images/12.png'
    }, {
      id: 9, title: '爱的飞行日记', singer: '周杰伦',
      src: 'http://localhost:3000/爱的飞行日记.mp3', coverImgUrl: '../images/13.png'
    }, {
      id: 10, title: '稻香', singer: '周杰伦',
      src: 'http://localhost:3000/稻香.mp3', coverImgUrl: '../images/02.jpg'
    }, {
      id: 11, title: '花海', singer: '周杰伦',
      src: 'http://localhost:3000/花海.mp3', coverImgUrl: '../images/13.png'
    }],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '',
    },
  },
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },
  audioCtx: null,
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    var that = this
    this.audioCtx.onError(function() {
      console.log('播放失败: ' + that.audioCtx.src)
    })
    this.audioCtx.onEnded(function() {
      that.next()
    })
    this.audioCtx.onPlay(function() {} )
    this.audioCtx.onTimeUpdate(function() {
      that.setData({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    this.setMusic(0)
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second :second)
    }
  },
  setMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': '0'
    })
  },
  play: function() {
    this.audioCtx.play()
    this.setData({ state: 'running'})
  },
  pause: function() {
    this.audioCtx.pause()
    this.setData({ state: 'paused'})
  },
  next: function() {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 
    0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
  },
  sliderChange: function(e) {
    var second = e.datail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },
  change: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
})
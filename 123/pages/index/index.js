const app = getApp()

Page({
  data: {
    highScore: 0
  },

  onLoad: function() {
    // 从全局数据获取最高分
    this.setData({
      highScore: app.globalData.highScore
    })
  },

  onShow: function() {
    // 每次显示页面时更新最高分
    this.setData({
      highScore: app.globalData.highScore
    })
  },

  startGame: function() {
    // 跳转到游戏页面
    wx.navigateTo({
      url: '/pages/game/game'
    })
  }
}) 
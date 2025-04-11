App({
  globalData: {
    userInfo: null,
    highScore: 0
  },
  onLaunch: function() {
    // 从本地存储获取最高分
    const highScore = wx.getStorageSync('highScore') || 0;
    this.globalData.highScore = highScore;
  }
}) 
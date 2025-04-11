const app = getApp()

Page({
  data: {
    score: 0,
    timeLeft: 30,
    gameOver: false,
    isNewHighScore: false,
    activeMoles: Array(9).fill().map(() => ({ show: false, type: 'mole' })),
    gameInterval: null,
    moleInterval: null
  },

  onLoad: function() {
    this.startGame();
  },

  onUnload: function() {
    // 清除所有计时器
    this.clearAllIntervals();
  },

  startGame: function() {
    // 初始化游戏数据
    this.setData({
      score: 0,
      timeLeft: 30,
      gameOver: false,
      isNewHighScore: false,
      activeMoles: Array(9).fill().map(() => ({ show: false, type: 'mole' }))
    });

    // 开始游戏计时器
    const gameInterval = setInterval(() => {
      if (this.data.timeLeft <= 1) {
        this.endGame();
      } else {
        this.setData({
          timeLeft: this.data.timeLeft - 1
        });
      }
    }, 1000);

    // 创建地鼠出现的计时器
    const moleInterval = setInterval(() => {
      this.showRandomMole();
    }, 800);

    this.setData({
      gameInterval: gameInterval,
      moleInterval: moleInterval
    });
  },

  showRandomMole: function() {
    // 复制当前的地鼠数组
    const moles = [...this.data.activeMoles];
    
    // 随机选择一个地洞
    const randomIndex = Math.floor(Math.random() * 9);
    
    // 如果地洞已经有地鼠，先不处理
    if (moles[randomIndex].show) {
      return;
    }
    
    // 有10%的概率出现炸弹
    const isBomb = Math.random() < 0.1;
    
    // 显示地鼠或炸弹
    moles[randomIndex] = {
      show: true,
      type: isBomb ? 'bomb' : 'mole'
    };
    
    this.setData({
      activeMoles: moles
    });
    
    // 1-2秒后地鼠消失
    const hideTime = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (this.data.gameOver) return;
      
      const currentMoles = [...this.data.activeMoles];
      currentMoles[randomIndex].show = false;
      
      this.setData({
        activeMoles: currentMoles
      });
    }, hideTime);
  },

  tapHole: function(e) {
    if (this.data.gameOver) return;
    
    const index = e.currentTarget.dataset.index;
    const moles = [...this.data.activeMoles];
    
    // 如果点击的洞没有地鼠，直接返回
    if (!moles[index].show) {
      return;
    }
    
    // 点到了炸弹
    if (moles[index].type === 'bomb') {
      // 减分
      this.setData({
        score: Math.max(0, this.data.score - 5)
      });
      
      // 震动反馈
      wx.vibrateShort();
    } else {
      // 点到了地鼠，加分
      this.setData({
        score: this.data.score + 1
      });
    }
    
    // 隐藏地鼠或炸弹
    moles[index].show = false;
    
    this.setData({
      activeMoles: moles
    });
  },

  endGame: function() {
    // 清除所有定时器
    this.clearAllIntervals();
    
    // 检查是否创造了新的最高分
    const isNewHighScore = this.data.score > app.globalData.highScore;
    
    if (isNewHighScore) {
      // 更新全局最高分
      app.globalData.highScore = this.data.score;
      // 保存到本地存储
      wx.setStorageSync('highScore', this.data.score);
    }
    
    // 更新游戏状态
    this.setData({
      gameOver: true,
      isNewHighScore: isNewHighScore
    });
  },

  clearAllIntervals: function() {
    // 清除游戏计时器
    if (this.data.gameInterval) {
      clearInterval(this.data.gameInterval);
    }
    
    // 清除地鼠出现计时器
    if (this.data.moleInterval) {
      clearInterval(this.data.moleInterval);
    }
  },

  restartGame: function() {
    // 重新开始游戏
    this.startGame();
  },

  backToHome: function() {
    // 返回首页
    wx.navigateBack();
  }
}) 
(function(){
    /**
     * 游戏数据
     * @type {Object}
     */
    var init = false;
    var key = "setCard";

    var modeList = [
        "beginner", "easy", "medium", "hard", "expert"
    ];

    GameData = {
        data: {
            currentMode: "", //当前的模式
            currentLevel: "", //当前的level
            soundOff: 0, //音效是否是关闭状态
            bgSoundOff: 0, //背景音乐是否是关闭状态
            lastGame: { //上一次的游戏数据
                mode: "",
                level: 0,
                errNum: 0,
                time: 0,
                reduceNum: 0,
                tipNum: 0,
                totalTipNum: 0,
                cardIndex: 0,
                cardIds: []
            },
            finishGame: { //已经完成的游戏数据
                beginner: {
                    "0": {
                        lastTime: 0,
                        bestTime: 0,
                        grade: 0
                    }
                }
            }
        },
        levelCount: 30,
        //下一关
        nextLevel: function(){
            var mode = this.getMode();
            var level = this.getLevel();
            if (level < (this.levelCount - 1)) {
                this.data.currentLevel = level + 1;
            }else{
                if (mode == 'expert') {
                    this.data.currentMode = 'beginner';
                    this.data.currentLevel = 0;
                }else{
                    var index = modeList.indexOf(mode);
                    this.data.currentMode = modeList[index+1];
                    this.data.currentLevel = 0;
                }
            }
            this.flush();
            this.initLastGameData();
        },
        initLastGameData: function(){
            var data = {
                errNum: 0,
                time: 0,
                reduceNum: 0,
                tipNum: 0,
                cardIndex: 0,
                cardIds: []
            };
            for(var name in data){
                this.data.lastGame[name] = data[name];
            }
            return this;
        },
        getLastGame: function(){
            return this.data.lastGame || {};
        },
        //获取已经完成的游戏列表
        getFinishGameList: function(mode){
            this.init();
            var list = this.data.finishGame[mode] || {};
            return list;
        },
        //完成一个游戏
        setFinishGame: function(mode, level, time, grade){
            this.init();
            if (!this.data.finishGame[mode]) {
                this.data.finishGame[mode] = {};
            };
            var oldItem = this.data.finishGame[mode][level] || {};
            var bestTime = time;
            if (oldItem.bestTime) {
                bestTime = Math.min(oldItem.bestTime, bestTime);
            };
            var item = {
                lastTime: time,
                bestTime: bestTime,
                grade: grade
            }
            this.data.finishGame[mode][level] = item;
            this.initLastGameData();
            this.flush();
        },
        set: function(name, value){
            this.data[name] = value;
            this.flush();
        },
        get: function(name){
            this.init();
            return this.data[name];
        },
        getMode: function(){
            return this.get("currentMode") || "beginner";
        },
        getLevel: function(){
            return this.get("currentLevel") || 0;
        },
        setLevel: function(level){
            this.init();
            this.data.currentLevel = level;
            this.flush();
            return this;
        },
        flush: function(){
            var data = JSON.stringify(this.data);
            try{
                cc.UserDefault.getInstance().setStringForKey(key, data);
            }catch(e){
                sys.localStorage.setItem(key, data);
            }
        },
        init: function(){
            if (init) {
                return true;
            };
            init = true;
            try{
                //for web page
                var data = cc.UserDefault.getInstance().getStringForKey(key);
            }catch(e){
                //for js binding
                var data = sys.localStorage.getItem(key);
            }
            data = JSON.parse(data || "{}") || {};
            if (data) {
                for(var name in data){
                    this.data[name] = data[name];
                }
            };
        },
        getLevelData: function(mode, level){
            var list = GameData.mode[mode] || [];
            return list[level] || [];
        },
    }
    /**
     * 游戏模式数据
     * @type {Object}
     */
    GameData.mode = {
        "beginner":[
            [63, 61, 53, 29, 37, 13, 42, 24, 70, 50, 12, 46, 73, 65, 28, 21, 20, 33, 55, 15, 79, 54, 34, 8, 45, 16, 17, 72, 1, 40, 59, 7, 64, 25, 77, 6, 31, 14, 3, 32, 60, 58, 67, 66, 49, 10, 36, 39, 5, 9, 75, 30, 62, 76, 44, 2, 52, 51, 38, 23, 22, 43, 57, 19, 18, 26, 56, 69, 71, 47, 4, 78, 11, 27, 68, 35, 74, 48, 41, 0, 80],
            [74, 38, 18, 4, 61, 11, 20, 35, 40, 31, 76, 33, 12, 56, 70, 9, 27, 71, 23, 17, 2, 58, 68, 69, 48, 14, 37, 10, 57, 30, 79, 32, 80, 41, 66, 39, 67, 19, 21, 34, 46, 64, 45, 75, 13, 52, 22, 62, 47, 73, 1, 43, 28, 0, 54, 5, 49, 55, 7, 60, 8, 65, 50, 53, 44, 63, 77, 36, 16, 78, 51, 25, 3, 26, 42, 72, 6, 15, 24, 59, 29],
            [24, 28, 80, 17, 33, 16, 0, 59, 27, 26, 42, 50, 29, 41, 30, 2, 37, 11, 39, 7, 6, 79, 34, 20, 51, 62, 77, 19, 49, 38, 56, 15, 75, 65, 43, 48, 76, 53, 36, 22, 70, 54, 73, 13, 52, 21, 57, 3, 60, 45, 66, 14, 61, 18, 32, 64, 35, 78, 25, 12, 69, 67, 68, 4, 10, 71, 46, 47, 40, 63, 1, 58, 23, 31, 9, 72, 55, 8, 5, 44, 74],
            [53, 42, 2, 54, 76, 36, 59, 57, 24, 37, 56, 4, 73, 41, 16, 33, 40, 12, 6, 7, 49, 18, 27, 21, 46, 68, 32, 35, 25, 69, 31, 34, 72, 14, 45, 19, 22, 10, 75, 8, 38, 78, 23, 29, 61, 66, 3, 70, 44, 60, 67, 20, 15, 43, 30, 62, 77, 48, 5, 74, 58, 13, 65, 11, 52, 47, 50, 17, 55, 28, 9, 64, 1, 71, 80, 39, 0, 51, 26, 63, 79],
            [76, 50, 75, 47, 2, 39, 0, 8, 12, 42, 55, 66, 20, 22, 25, 33, 10, 3, 80, 38, 18, 62, 4, 23, 65, 59, 19, 77, 31, 44, 53, 54, 67, 57, 36, 68, 16, 17, 72, 70, 41, 58, 45, 29, 9, 43, 27, 46, 60, 71, 5, 63, 24, 61, 52, 26, 28, 56, 69, 32, 15, 21, 79, 51, 34, 13, 6, 64, 40, 11, 30, 14, 49, 7, 35, 48, 74, 1, 73, 37, 78],
            [38, 51, 9, 61, 56, 46, 48, 77, 20, 67, 1, 78, 73, 0, 23, 40, 64, 29, 41, 57, 2, 25, 36, 37, 13, 26, 11, 17, 47, 43, 27, 70, 75, 74, 65, 3, 30, 8, 42, 55, 34, 39, 28, 76, 45, 21, 79, 49, 62, 18, 66, 50, 31, 72, 54, 63, 52, 15, 32, 6, 60, 59, 5, 7, 14, 71, 53, 69, 12, 58, 19, 80, 10, 35, 22, 24, 4, 33, 68, 44, 16],
            [72, 60, 2, 62, 0, 61, 45, 35, 33, 73, 68, 47, 24, 25, 52, 53, 29, 8, 54, 48, 23, 65, 6, 49, 58, 59, 67, 64, 30, 37, 39, 11, 80, 74, 44, 22, 70, 77, 7, 3, 41, 17, 28, 13, 16, 69, 5, 63, 50, 1, 32, 75, 42, 9, 55, 34, 26, 66, 43, 21, 71, 12, 79, 46, 78, 14, 18, 36, 4, 10, 31, 19, 27, 38, 40, 56, 51, 15, 20, 76, 57],
            [72, 51, 5, 79, 38, 2, 69, 71, 31, 15, 33, 23, 49, 4, 62, 14, 20, 27, 42, 64, 60, 47, 21, 25, 54, 35, 74, 40, 68, 76, 70, 59, 41, 52, 77, 57, 45, 0, 75, 18, 73, 63, 28, 43, 16, 24, 8, 1, 22, 39, 50, 12, 78, 61, 36, 17, 29, 10, 46, 7, 3, 66, 80, 9, 34, 37, 55, 30, 56, 13, 67, 44, 6, 26, 58, 48, 65, 32, 11, 53, 19],
            [29, 76, 3, 27, 13, 75, 65, 7, 71, 60, 11, 74, 47, 43, 78, 16, 30, 55, 25, 54, 0, 24, 79, 31, 6, 35, 22, 56, 26, 19, 50, 53, 38, 62, 41, 77, 59, 49, 40, 8, 18, 58, 17, 1, 15, 68, 61, 4, 28, 66, 12, 36, 51, 34, 57, 73, 80, 37, 64, 23, 69, 45, 33, 70, 42, 63, 9, 20, 44, 72, 21, 32, 2, 48, 46, 67, 14, 5, 10, 39, 52],
            [61, 20, 7, 46, 74, 30, 37, 55, 48, 79, 42, 59, 25, 60, 0, 67, 38, 65, 23, 53, 78, 32, 11, 73, 41, 29, 19, 34, 49, 50, 51, 75, 66, 57, 56, 1, 16, 5, 13, 54, 8, 26, 10, 47, 21, 80, 24, 3, 15, 40, 27, 35, 22, 44, 39, 52, 2, 6, 33, 71, 77, 64, 58, 69, 63, 45, 62, 14, 70, 76, 72, 17, 43, 9, 18, 31, 28, 36, 4, 68, 12],
            [79, 14, 2, 26, 45, 52, 16, 22, 13, 19, 40, 62, 37, 20, 56, 49, 25, 70, 18, 7, 0, 9, 39, 8, 36, 17, 77, 33, 53, 11, 50, 58, 27, 64, 69, 29, 68, 72, 65, 57, 31, 75, 10, 54, 21, 5, 35, 73, 76, 51, 46, 71, 55, 30, 28, 42, 3, 80, 67, 44, 41, 43, 24, 48, 23, 4, 47, 6, 34, 63, 38, 32, 1, 12, 15, 74, 78, 66, 60, 61, 59],
            [28, 0, 53, 23, 33, 16, 1, 42, 48, 3, 45, 69, 72, 32, 14, 71, 50, 36, 58, 64, 55, 78, 20, 12, 18, 43, 19, 79, 30, 70, 65, 10, 35, 6, 24, 67, 75, 52, 46, 73, 68, 54, 74, 66, 51, 29, 60, 9, 13, 39, 59, 27, 31, 8, 37, 11, 21, 25, 62, 26, 2, 40, 41, 49, 15, 56, 34, 63, 76, 17, 7, 38, 61, 80, 47, 57, 44, 4, 5, 22, 77],
            [46, 68, 37, 10, 20, 35, 31, 11, 19, 29, 42, 3, 51, 40, 22, 74, 71, 38, 0, 75, 43, 49, 13, 48, 63, 1, 14, 4, 15, 18, 76, 34, 47, 30, 32, 54, 60, 70, 12, 66, 65, 6, 72, 2, 53, 26, 44, 5, 28, 25, 62, 64, 55, 58, 79, 69, 16, 23, 21, 56, 36, 52, 57, 59, 9, 24, 39, 61, 67, 33, 17, 7, 73, 41, 50, 45, 80, 27, 8, 78, 77],
            [70, 24, 69, 14, 17, 2, 52, 79, 59, 9, 68, 38, 8, 1, 0, 21, 4, 12, 76, 80, 65, 56, 45, 43, 66, 29, 3, 27, 25, 34, 63, 22, 11, 71, 40, 19, 74, 51, 33, 53, 18, 62, 60, 7, 78, 36, 35, 42, 32, 50, 15, 61, 26, 64, 37, 47, 77, 39, 67, 30, 5, 41, 57, 31, 20, 10, 6, 13, 49, 48, 72, 46, 23, 44, 73, 58, 75, 16, 28, 54, 55]
        ]
    };
})();
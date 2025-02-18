(function() {
    var SPECIAL_SKILL_ID = 15;  // 偷窃技能的ID
    var SPECIAL_SKILL_ICON = 106;  // 偷窃技能的图标

    var _hasSpecialSkill = false;
    var stealingInProgress = false;

    // 检查玩家队伍是否拥有偷窃技能
    function checkSpecialSkills() {
        _hasSpecialSkill = $gameParty.members().some(actor => actor.hasSkill(SPECIAL_SKILL_ID));
    }

    // 创建技能UI窗口
    function Window_SpecialSkill() {
        this.initialize.apply(this, arguments);
    }

    Window_SpecialSkill.prototype = Object.create(Window_Base.prototype);
    Window_SpecialSkill.prototype.constructor = Window_SpecialSkill;

    Window_SpecialSkill.prototype.initialize = function() {
        var x = Graphics.width - 180;  // 调整位置
        var y = Graphics.height - 100;  // 调整位置
        var width = 180;  // 调整宽度
        var height = 80;  // 调整高度
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 180; // 半透明背景
        this.refresh();
    };

    Window_SpecialSkill.prototype.refresh = function() {
        this.contents.clear();
        checkSpecialSkills();
        if (_hasSpecialSkill && $gamePlayer.canMove()) {
            this.drawText("偷窃", 10, 10, this.contents.width - 40);
            this.drawIcon(SPECIAL_SKILL_ICON, this.contents.width - 40, 10); // 图标右侧显示
            this.visible = true; // 仅当可用时显示
        } else {
            this.visible = false;
        }
    };

    // 添加鼠标点击检测
    Window_SpecialSkill.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this.visible && TouchInput.isTriggered()) {
            var x = TouchInput.x;
            var y = TouchInput.y;
            if (this.isInsideFrame(x, y)) {
                this.processStealCommand();
            }
        }
    };

    Window_SpecialSkill.prototype.isInsideFrame = function(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    };

    Window_SpecialSkill.prototype.processStealCommand = function() {
        if (!$gamePlayer.canMove()) return;
        stealingInProgress = true;
    };

    // 在地图场景中创建窗口
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createSpecialSkillWindow();
    };

    Scene_Map.prototype.createSpecialSkillWindow = function() {
        this._specialSkillWindow = new Window_SpecialSkill();
        this.addChild(this._specialSkillWindow);
    };

    // 更新窗口状态
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._specialSkillWindow) {
            this._specialSkillWindow.refresh();
        }
    };

    // 恢复点击地图移动的功能
    var _TouchInput_onTrigger = TouchInput.onTrigger;
    TouchInput.onTrigger = function() {
        if (stealingInProgress) {
            Game_Player.prototype.checkStealTarget();
            stealingInProgress = false;
        } else {
            _TouchInput_onTrigger.call(this);
        }
    };

    // 找到玩家附近的偷窃目标
    Game_Player.prototype.findNearStealTarget = function() {
        var x = $gamePlayer.x;
        var y = $gamePlayer.y;
        return $gameMap.events().find(event => Math.abs(event.x - x) <= 1 && Math.abs(event.y - y) <= 1);
    };

    // 偷窃逻辑
    Game_Player.prototype.checkStealTarget = function() {
        var target = this.findNearStealTarget();
        if (target) {
            console.log("成功偷窃目标：" + target.eventId());
        }
    };

})();

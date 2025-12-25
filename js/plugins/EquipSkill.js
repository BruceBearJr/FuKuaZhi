/*:
 * @plugindesc 装备武器时赋予技能，卸下后移除，仅影响装备技能
 * @author 修复版
 */

(function() {

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.refreshEquipSkills();
    };

    Game_Actor.prototype.refreshEquipSkills = function() {
        this._equipSkillIds = this._equipSkillIds || [];

        // 当前装备提供的技能
        const newEquipSkills = [];

        this.equips().forEach(item => {
            if (item && item.meta["Equip Skill"]) {
                newEquipSkills.push(Number(item.meta["Equip Skill"]));
            }
        });

        // 学习新增的装备技能
        newEquipSkills.forEach(skillId => {
            if (!this._equipSkillIds.includes(skillId)) {
                this.learnSkill(skillId);
            }
        });

        // 移除已卸下装备的技能
        this._equipSkillIds.forEach(skillId => {
            if (!newEquipSkills.includes(skillId)) {
                this.forgetSkill(skillId);
            }
        });

        this._equipSkillIds = newEquipSkills.slice();
    };

})();

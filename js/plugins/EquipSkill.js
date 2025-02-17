/*:
 * @plugindesc 让武器装备时自动赋予技能，卸下后移除技能。
 * @author 你的名字
 *
 * @help
 * 你可以在武器的备注（Note）栏添加：
 * <Equip Skill: X>
 * 其中 X 是技能的 ID，装备武器后角色会自动获得该技能，卸下后技能会被移除。
 */

(function() {
    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.refreshEquipSkills();
    };

    Game_Actor.prototype.refreshEquipSkills = function() {
        this._equippedSkills = [];
        this.equips().forEach(item => {
            if (item && item.meta["Equip Skill"]) {
                this.learnSkill(Number(item.meta["Equip Skill"]));
                this._equippedSkills.push(Number(item.meta["Equip Skill"]));
            }
        });
        this.skills().forEach(skill => {
            if (!this._equippedSkills.includes(skill.id)) {
                this.forgetSkill(skill.id);
            }
        });
    };
})();

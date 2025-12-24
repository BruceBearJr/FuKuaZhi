/*:
 * @plugindesc Replace Attack skill by class note tag
 * @author You
 *
 * @help
 * In class note:
 * <Replace Attack: x>
 * x = skill ID
 */

(function() {

  // 读取职业备注里的替代攻击技能
  Game_Actor.prototype.attackSkillId = function() {
    var cls = this.currentClass();
    if (!cls || !cls.note) return Game_BattlerBase.prototype.attackSkillId.call(this);

    var match = cls.note.match(/<Replace\s+Attack:\s*(\d+)>/i);
    if (match) {
      return Number(match[1]);
    }

    return Game_BattlerBase.prototype.attackSkillId.call(this);
  };

})();

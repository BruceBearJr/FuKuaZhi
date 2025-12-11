/*:
 * @target MV
 * @plugindesc Adds WASD keys for player movement (in addition to arrow keys).
 * @author ChatGPT
 *
 * @help
 * 使用方法：
 * 1. 把这个文件放到 js/plugins 文件夹
 * 2. 在插件管理器启用即可
 * 
 * 默认方向键依然可以使用，WASD 是额外的控制方式。
 */

(function() {
    Input.keyMapper[87] = 'up';    // W
    Input.keyMapper[65] = 'left';  // A
    Input.keyMapper[83] = 'down';  // S
    Input.keyMapper[68] = 'right'; // D
})();

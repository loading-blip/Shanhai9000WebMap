/**
 * 
 * @param {HTMLElement} element 要拖动的div元素
 * @returns {void} 
 * @description 使指定的div元素可拖动
 */
export function DivDraggable(element) {
    let isDragging = false;
    let startX, startY;
    let startLeft, startTop;

    // 保存初始的transform值（保留你的居中样式）
    const initialTransform = element.style.transform;

    // 添加拖动指针样式（不影响内部元素的交互）
    element.style.cursor = 'move';

    element.addEventListener('mousedown', function(e) {
        // 只响应左键点击
        if (e.button !== 0) return;
        
        isDragging = true;
        
        // 记录初始位置
        startX = e.clientX;
        startY = e.clientY;
        
        // 获取当前计算位置（考虑transform）
        const rect = element.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        // 移除transform以启用精确拖动
        element.style.transform = 'none';
        
        // 防止文本选中和默认拖拽行为
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 计算移动距离
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        // 应用新位置（保持原有的position: absolute）
        element.style.left = (startLeft + dx) + 'px';
        element.style.top = (startTop + dy) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            
            // 拖动结束后可以在这里添加位置限制逻辑（如果需要）
            // 例如确保元素不会移出视口
        }
    });

    // 双击重置位置（可选功能）
    element.addEventListener('dblclick', function() {
        element.style.left = '50%';
        element.style.top = '';
        element.style.bottom = '50px';
        element.style.transform = initialTransform;
    });
}
/**
 * 
 * @param {HTMLElement} element 传入面板节点
 * @param {HTMLElement} mask 传入遮罩节点
 * @param {String} status 传入当前状态值，hide或其他
 * @param {int} elementWidth 传入窗口宽度
 * @returns {void} 
 * @description 显示或隐藏控制面板
 */
export function ShowControlPanel(element,mask,status,elementWidth) {
    if (status === 'hide') {
        element.style.left = '20px';
        mask.style.display = 'block';
        return;
    }
    mask.style.display = 'none';
    element.style.left = `${-elementWidth}px`;
}

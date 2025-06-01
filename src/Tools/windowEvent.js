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

    // 添加拖动指针样式
    element.style.cursor = 'move';

    // 统一处理开始事件
    function dragStart(e) {
        // 鼠标左键或触控
        if ((e.type === 'mousedown' && e.button !== 0)) return;

        isDragging = true;

        // 兼容触控
        const point = e.touches ? e.touches[0] : e;
        startX = point.clientX;
        startY = point.clientY;

        const rect = element.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;

        element.style.transform = 'none';
        e.preventDefault();
    }

    // 统一处理移动事件
    function dragMove(e) {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - startX;
        const dy = point.clientY - startY;
        element.style.left = (startLeft + dx) + 'px';
        element.style.top = (startTop + dy) + 'px';
    }

    // 统一处理结束事件
    function dragEnd() {
        if (isDragging) {
            isDragging = false;
        }
    }

    // 鼠标事件
    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    // 触控事件
    element.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('touchend', dragEnd);

    // 双击重置位置
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

/**
 * 
 * @returns {number} 最高z-index 
 * @description 获取最该z-index数字
 */
export function getHighestZIndexOptimized() {
  const elements = document.querySelectorAll('body *');
  let maxZ = 0;
  
  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    // 只检查定位元素(position不为static)和可见元素
    if (style.position !== 'static' && style.display !== 'none' && style.visibility !== 'hidden') {
      const zIndex = parseInt(style.zIndex);
      if (!isNaN(zIndex)) {
        maxZ = Math.max(maxZ, zIndex);
      }
    }
  });
  
  return maxZ === 0 ? 'auto或未设置' : maxZ;
}

/**
 * 注册窗口拖拽事件
 * @param {HTMLElement} draggableHandles - 拖拽手柄
 */
export function RegDraggableHandle(draggableHandles){
    let currentContainer, offsetX, offsetY;

    function startDrag(e) {
        currentContainer = draggableHandles.parentElement;
        offsetX = (e.clientX || e.touches[0].clientX) - currentContainer.offsetLeft;
        offsetY = (e.clientY || e.touches[0].clientY) - currentContainer.offsetTop;
        document.body.style.userSelect = 'none'; // Prevent text selection

        function onMove(e) {
            currentContainer.style.left = `${(e.clientX || e.touches[0].clientX) - offsetX}px`;
            currentContainer.style.top = `${(e.clientY || e.touches[0].clientY) - offsetY}px`;
        }

        function stopDrag() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', stopDrag);
            document.body.style.userSelect = '';
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', stopDrag);
    }

    draggableHandles.addEventListener('mousedown', startDrag,{ passive: true });
    draggableHandles.addEventListener('touchstart', startDrag,{ passive: true });
}
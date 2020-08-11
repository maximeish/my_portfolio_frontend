//admin board
const tabTitles = document.querySelectorAll('#editor .tab-title');
const tabPanels = document.querySelectorAll('#editor .tab-panel');

const showPanel = (panelIndex, colorCode) => {
    tabTitles.forEach(node => {
        node.style.backgroundColor = '';
        node.style.color = '';
    });

    tabTitles[panelIndex].style.backgroundColor = colorCode;
    tabTitles[panelIndex].style.color = '#222';

    tabPanels.forEach(node => {
        node.style.display = 'none';
        node.style.color = '';
    });

    tabPanels[panelIndex].style.display = 'block';
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}

showPanel(0, '#C5CC5D');
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    checkSidebarItemClick();
});

function checkSidebarItemClick() {
    document.querySelector('.list-group').addEventListener('click', _e => {
        let tabItem = document.createElement('div');
        tabItem.classList.add('tab-item');
        let span = document.createElement('span');
        span.classList.add("icon", "icon-cancel", "icon-close-tab");
        tabItem.appendChild(span);
        appendTabItem(tabItem);
    })

    function appendTabItem(element) {
        getTabGroup().appendChild(element);
        // Get the tab group element to append the new tab
        function getTabGroup() {
            // Existing or non-existing tab container
            let tabGroup = document.querySelector('.tab-group');
            return tabGroup ? tabGroup : createTabGroup();

            function createTabGroup() {
                let pane = document.querySelector('.pane');
                if (pane) {
                    let tabGroup = document.createElement('div');
                    tabGroup.classList.add('tab-group');
                    pane.appendChild(tabGroup);
                }
            }
        }
    }
}
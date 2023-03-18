/* Send message to tab to apply theme */
function applyTheme(theme){
    const message = {
        command: "apply-theme",
        theme: theme
    };

    const tab = browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, message);
    });
}

/* Function that will be executed when a theme button is clicked */
function onClickApplyTheme(event){
    const theme = event.target.id;
    applyTheme(theme);
}

/* Buttons that apply a theme */
const theme_buttons = document.querySelectorAll(".apply-theme-button");
/* Add click event for each theme button */
theme_buttons.forEach((theme_button) => {
    theme_button.addEventListener("click", (event) => onClickApplyTheme(event));
})

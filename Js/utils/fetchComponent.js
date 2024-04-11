export default async function handleFetchComponent(component, target, classList = null) {
    try {
        const response = await fetch(component);
        const text = await response.text();

        if (text) {
            target.innerHTML = text;

            if (classList) {
                target.classList.remove('d-none');
                target.classList.add('d-block')
            }
        }  
    } catch (error) {
        console.log(error);
    }
}
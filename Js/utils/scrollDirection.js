let prevScroll = 0;

export default function FnScrollDirection(scrollY) {

    let currentScroll = scrollY;

    if (currentScroll > 0 && currentScroll >= prevScroll) {
        prevScroll = currentScroll;
        return "down";
    } else {
        prevScroll = currentScroll;
        return "up";
    };

};
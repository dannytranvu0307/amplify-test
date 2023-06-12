const CheckEmpty = (form,objs,t) => {
    let check = true;
    for (let i = 0; i < objs.length ; i++) {
        // const a = Validators(form,objs[i], objs[i].value)
        if (objs[i].value === '' ){
            const input = form.querySelector(`#${objs[i].id}`);
            input.classList.add('border-red-500','bg-red-100')
            input.parentNode.querySelector("span").innerHTML = t()
            check = false
        }
    }

    return check
}

export default CheckEmpty
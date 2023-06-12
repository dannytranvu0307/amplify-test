import Validators from "./Validators";

const ValidatorSubmit = (form, objs,t) =>{
    const arr = []
    for (let i = 0; i < objs.length ; i++) {
        if (objs[i] !== null){
            const a = Validators(form,objs[i], objs[i].value)
            if (a.name !== "") {
                const input = form.querySelector(`#${objs[i].id}`);
                input.classList.add('border-red-500','bg-red-100')
                input.parentNode.querySelector("span").innerHTML = t(a.name)
                arr.push(a.name);
            }else {
                const input = form.querySelector(`#${objs[i].id}`);
                input.parentNode.querySelector("span").innerHTML = ""
            }
        }
    }
    return arr.length === 0;
}

export default ValidatorSubmit
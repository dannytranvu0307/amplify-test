import Validators from "./Validators";

const ValidatorSubmit = (form, objs) =>{
    const arr = []
    for (let i = 0; i < objs.length ; i++) {
        if (objs[i] !== null){
            const a = Validators(form,objs[i], objs[i].value)
            if (a.name !== "") {
                const input = form.querySelector(`#${objs[i].id}`);
                input.classList.add('border-red-500','bg-red-100')
                arr.push(a.name);
            } 
        }
    }
    return arr.length === 0;
}

export default ValidatorSubmit
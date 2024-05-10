export function formatCurrency(ammount: number){
    return new Intl.NumberFormat('en-US',{
        style: 'currency', 
        currency: 'USD',
    }).format(ammount);
}

export function toBoolean(str: string){
    return str.toLocaleLowerCase()==="true"
}
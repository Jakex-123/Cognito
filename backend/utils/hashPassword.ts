export const hashedPassword=async (password:string)=>{
    const pass=new TextEncoder().encode(password)
    const encrypted=await crypto.subtle.digest('SHA-256',pass);
    const hashedArray=Array.from(new Uint8Array(encrypted))
    const hashHex=hashedArray.map((byte)=>byte.toString(16).padStart(2,'0')).join('');
    return hashHex
}
interface Member {
    userId:string,
    email:string
}

interface ITeam {
    _id?: string,
    name: string,
    shortName: string,
    description: string,
    members: Member[]  | string[]
}
export default ITeam;
export {
    Member
}
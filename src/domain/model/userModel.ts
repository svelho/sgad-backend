class UserModel {
  constructor(
    public name: string,
    public email: string,
    public photoUrl: string,
    public uid: string,
    public phone: string,
    public position: string,
    public area: string
  ) {}
}

export default UserModel;

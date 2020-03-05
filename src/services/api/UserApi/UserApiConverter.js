export class UserApiConverter {

  convertUsersList = data => ({
    users: data?.users || [],
    quantity: data?.quantity || 0,
    totalBalance: data?.balance_sum || 0,
  });

  convertNewPassword = data => data.new_password;
}
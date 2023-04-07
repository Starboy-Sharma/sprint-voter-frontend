export function getMembers(team) {
  const members = team.members;
  const firstFourMember = members.slice(0, 3);
  let memberNames = [];

  firstFourMember.forEach((member) => {
    if (member.id !== team.userId) memberNames.push(member.name);
  });
  memberNames = memberNames.join(', ');

  if (memberNames.length <= 3) {
    memberNames = 'You, ' + memberNames;
  } else {
    // remove the last member name
    memberNames.slice(memberNames.length - 1, 1);
    memberNames = 'You, ' + memberNames;
  }
  return memberNames;
}

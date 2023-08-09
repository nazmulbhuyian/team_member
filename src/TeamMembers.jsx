import { useState, useEffect } from 'react';

function TeamMembers({ teamId }) {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function getTeamMembers() {
            const response = await fetch(`https://graph.microsoft.com/v1.0/teams/${teamId}/members`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
            const data = await response.json();
            setMembers(data?.value);
        }
        getTeamMembers();
    }, [accessToken, teamId]);

    return (
        <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "blue" }}>Team Members Information</h2>
            <ul>
                {members?.map(member => (
                    <li style={{ padding: "1rem", margin: "1rem", background: "#f2f2f2", borderRadius: "5px", boxShadow: "1px 1px 5px grey" }} key={member.id}>
                        <span style={{ fontWeight: "bold", marginRight: "1rem", color: "green" }}>Name: </span>
                        {member?.displayName}
                        <span style={{ fontWeight: "bold", marginLeft: "1rem", color: "purple" }}>Email: </span>
                        {member?.mail}
                        <span style={{ fontWeight: "bold", marginLeft: "1rem", color: "brown" }}>Job Title: </span>
                        {member?.jobTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamMembers;










// import React, { useState, useEffect } from 'react';
// import { CSVLink } from 'react-csv';

// function TeamMembers({ accessToken }) {
//   const [teams, setTeams] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     async function getTeams() {
//       const response = await fetch('https://graph.microsoft.com/v1.0/me/joinedTeams', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const data = await response.json();
//       setTeams(data?.value);
//     }

//     getTeams();
//   }, [accessToken]);

//   useEffect(() => {
//     async function getTeamMembers(teamId) {
//       const response = await fetch(`https://graph.microsoft.com/v1.0/teams/${teamId}/members`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const data = await response.json();
//       const members = data?.value?.map(member => ({
//         teamId,
//         displayName: member?.displayName,
//         email: member?.mail,
//         role: member?.roles[0] || '',
//       }));
//       setTeamMembers(prevMembers => [...prevMembers, ...members]);
//     }

//     teams?.forEach(team => getTeamMembers(team?.id));
//   }, [accessToken, teams]);

//   const headers = [
//     { label: 'Team ID', key: 'teamId' },
//     { label: 'Display Name', key: 'displayName' },
//     { label: 'Email', key: 'email' },
//     { label: 'Role', key: 'role' },
//   ];

//   return (
//     <div>
//       <h2>Team Members</h2>
//       {teamMembers.length > 0 ? (
//         <>
//           <CSVLink data={teamMembers} headers={headers} filename="team-members.csv">
//             Download CSV
//           </CSVLink>
//           <table>
//             <thead>
//               <tr>
//                 <th>Team ID</th>
//                 <th>Display Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teamMembers?.map(member => (
//                 <tr key={`${member.teamId}-${member.email}`}>
//                   <td>{member?.teamId}</td>
//                   <td>{member?.displayName}</td>
//                   <td>{member?.email}</td>
//                   <td>{member?.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p>Loading team members...</p>
//       )}
//     </div>
//   );
// }

// export default TeamMembers;
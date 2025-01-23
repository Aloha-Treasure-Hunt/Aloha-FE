import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, name: "My Khe Cuties", score: 0 },
]

export function Leaderboard() {
  return (
    <div className="p-6">
      <h2 className="heading-medium mb-4">Team Leaderboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((player) => (
            <TableRow key={player.rank}>
              <TableCell>{player.rank}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


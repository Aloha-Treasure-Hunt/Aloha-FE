import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, name: "Da Nang Good Team", score: 1000 },
  { rank: 2, name: "Friends of the Dragon Bridge", score: 950 },
  { rank: 3, name: "Son Tra Wave Riders", score: 900 },
  { rank: 4, name: "Berlin's Best", score: 850 },
  { rank: 5, name: "We Love Coffee", score: 800 },
  { rank: 6, name: "Loan and Friends", score: 675 },
  { rank: 7, name: "My Khe Cuties", score: 420 },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}


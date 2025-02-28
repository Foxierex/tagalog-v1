import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Save, AlertCircle } from "lucide-react"

interface ContentStatusBadgeProps {
  status: "draft" | "pending" | "approved" | "rejected"
}

export default function ContentStatusBadge({ status }: ContentStatusBadgeProps) {
  switch (status) {
    case "draft":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <Save className="h-3 w-3 mr-1" /> Draft
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" /> Pending Approval
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" /> Rejected
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <AlertCircle className="h-3 w-3 mr-1" /> Unknown
        </Badge>
      )
  }
}


<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $total_pending = Task::where('status', 'pending')->count();
        $my_Pending_tasks = Task::where('assigned_user_id', Auth::user()->id)
            ->where('status', 'pending')
            ->count();
      
        $my_Progress_tasks = Task::where('assigned_user_id', Auth::user()->id)
            ->where('status', 'in_progress')
            ->count();

        $my_completed_tasks = Task::where('assigned_user_id', Auth::user()->id)
            ->where('status', 'completed')
            ->count();

        return inertia('Dashboard', compact('total_pending', 'my_Pending_tasks', 'my_Progress_tasks', 'my_completed_tasks'));
    }
}

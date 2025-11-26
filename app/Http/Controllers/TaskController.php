<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        // single, consistent eager load using the relationship method names
        $query = Task::with(['project', 'assignedUser', 'createdBy', 'updatedBy']);

        // Search by name
        if ($request->has('name') && !empty($request->name)) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filter by project
        if ($request->has('project_id') && !empty($request->project_id)) {
            $query->where('project_id', $request->project_id);
        }

        // Other filters
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('priority') && !empty($request->priority)) {
            $query->where('priority', $request->priority);
        }

        // Sorting (defaults)
        $sortField = $request->input('sortField', 'created_at');
        $sortDirection = $request->input('sortDirections', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // paginate (eager loads already applied)
        $tasks = $query->paginate(10);

        $projects = Project::select('id', 'name')->get();

        return Inertia::render('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'projects' => $projects,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Task/Create', [
            'projects' => Project::select(['id', 'name'])->get(),
            'users' => User::select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $task = Task::create($data);

        return redirect()
            ->route('task.index')
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['project', 'assignedUser', 'createdBy', 'updatedBy']);

        return Inertia::render('Task/Show', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        // use the same relation name as the model method (assignedUser)
        $task->load(['project', 'assignedUser']);

        return Inertia::render('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => Project::select(['id', 'name'])->get(),
            'users' => User::select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $task->update($data);

        return redirect()
            ->route('task.index')
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()
            ->route('task.index')
            ->with('success', 'Task deleted successfully.');
    }
}

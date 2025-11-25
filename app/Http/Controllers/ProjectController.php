<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query()->with(['createdBy', 'updatedBy']);

        $sortField = request('sortField') ?: 'created_at';
        $sortDirections = request('sortDirections') ?: 'desc';

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDirections)->paginate(10)->onEachSide(1);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->due_date = $request->due_date;
        $project->status = 'pending'; // Default status
        $project->created_by = Auth::id();
        $project->updated_by = Auth::id();
        $project->save();

        return redirect()->route('project.index')
            ->with('success', 'Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        // Eager load the relationships to avoid N+1 queries
        $project->load(['createdBy', 'updatedBy']);
        
        // Convert due_date to Carbon instance if it's a string
        if ($project->due_date && is_string($project->due_date)) {
            $project->due_date = \Carbon\Carbon::parse($project->due_date);
        }
        
        // Format the due_date for the date input
        $project->due_date = $project->due_date ? $project->due_date->format('Y-m-d') : null;
        
        return inertia('Project/Edit', [
            'project' => $project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->name = $request->name;
        $project->description = $request->description;
        $project->due_date = $request->due_date;
        $project->status = $request->status;
        $project->updated_by = Auth::id();
        
        $project->save();

        return redirect()->route('project.index')
            ->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
            $project->tasks()->delete();

        $project->delete();
        return redirect()->route('project.index')
            ->with('success', 'Project ' . $name . ' deleted successfully!');
    }
}

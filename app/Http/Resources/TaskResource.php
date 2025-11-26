<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Disable the default "data" wrapper so the resource resolves to a plain array.
     *
     * This makes the frontend receive { id, name, ... } instead of { data: { ... } }.
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'project_id' => $this->project_id,
            'due_date' => $this->due_date ? (new Carbon($this->due_date))->format('Y-m-d') : null,
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'assigned_user_id' => $this->assigned_user_id,
            'created_at' => $this->created_at ? (new Carbon($this->created_at))->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? (new Carbon($this->updated_at))->format('Y-m-d H:i:s') : null,
            'created_by' => $this->whenLoaded('createdBy', function () {
                return $this->createdBy ? [
                    'id' => $this->createdBy->id,
                    'name' => $this->createdBy->name
                ] : null;
            }),
            'updated_by' => $this->whenLoaded('updatedBy', function () {
                return $this->updatedBy ? [
                    'id' => $this->updatedBy->id,
                    'name' => $this->updatedBy->name
                ] : null;
            }),
            'project' => $this->whenLoaded('project', function () {
                return $this->project ? [
                    'id' => $this->project->id,
                    'name' => $this->project->name
                ] : null;
            }),
            'assigned_user' => $this->whenLoaded('assignedUser', function () {
                return $this->assignedUser ? [
                    'id' => $this->assignedUser->id,
                    'name' => $this->assignedUser->name,
                    'email' => $this->assignedUser->email
                ] : null;
            }),
        ];
    }
}

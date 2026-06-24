<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostsTable extends Migration
{
	public function up()
	{
		if (! Schema::hasTable('blog_posts')) {
			Schema::create('blog_posts', function (Blueprint $table) {
				$table->id();
				$table->string('title');
				$table->text('body')->nullable();
				$table->timestamps();
			});
		}
	}

	public function down()
	{
		Schema::dropIfExists('blog_posts');
	}
}


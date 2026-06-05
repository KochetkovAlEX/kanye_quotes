class QuotesController < ApplicationController
  before_action :require_login

  def index
    @quotes = current_user.quotes.order(created_at: :desc)
    @quote = Quote.new
  end

  # POST /quotes
  def create
    @quote = current_user.quotes.build(quote_text: params[:text])

    if @quote.save
      render json: { id: @quote.id, text: @quote.quote_text }, status: :created
    else
      render json: { errors: @quote.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /quotes/:id
  def destroy
    @quote = current_user.quotes.find(params[:id])
    @quote.destroy
    head :no_content
  end
end

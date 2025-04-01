from typing import Literal

# Define available LLM types
LLMType = Literal["basic", "reasoning", "vision"]

# Define agent-LLM mapping
AGENT_LLM_MAP: dict[str, LLMType] = {
    "coordinator": "basic",  # Coordinator uses basic LLM by default
    "planner": "reasoning",  # Planner uses reasoning LLM by default
    "supervisor": "basic",  # Supervisor uses basic LLM
    "researcher": "basic",  # Simple search tasks use basic LLM
    "coder": "basic",  # Programming tasks use basic LLM
    "browser": "vision",  # Browser operations use vision LLM
    "reporter": "basic",  # Report writing uses basic LLM
}

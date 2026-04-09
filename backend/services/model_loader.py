import os
import logging
from pathlib import Path
import joblib

logger = logging.getLogger("backend.services.model_loader")

class ModelLoader:
    def __init__(self):
        self._models = {}
        self.models_dir = Path(__file__).parent.parent / "models"
        logger.info(f"Initializing ModelLoader. Target directory: {self.models_dir}")
        self._preload_all()

    def _preload_all(self):
        self.load_model("conversion", "conversion.pkl")
        self.load_model("fatigue", "fatigue.pkl")
        self.load_model("segmentation", "segmentation.pkl")

    def load_model(self, model_name: str, filename: str):
        """
        Attempts to load a joblib/pkl model from backend/models/
        Gracefully falls back to mock deterministic inference if completely missing.
        """
        model_path = self.models_dir / filename
        
        if model_path.exists():
            try:
                self._models[model_name] = joblib.load(model_path)
                logger.info(f"Successfully loaded real model [{model_name}] from {model_path}")
            except Exception as e:
                logger.error(f"Failed to load model {model_name} from {model_path}: {e}")
                logger.warning(f"Falling back to mock logic for [{model_name}]")
                self._models[model_name] = None
        else:
            logger.warning(f"File {filename} not found in {self.models_dir}. Falling back to mock deterministic logic for [{model_name}]")
            self._models[model_name] = None

        return True

    def get_conversion_model(self):
        return self._models.get("conversion")

    def get_fatigue_model(self):
        return self._models.get("fatigue")

    def get_segmentation_model(self):
        return self._models.get("segmentation")

model_loader = ModelLoader()
